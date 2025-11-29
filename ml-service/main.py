from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
import pickle
import io
import os

from typing import Optional

# Optional libraries for document parsing
try:
    import pdfminer.high_level as pdfminer_high_level
except Exception:
    pdfminer_high_level = None

try:
    import docx  # python-docx
except Exception:
    docx = None

app = FastAPI(title="CV Job Matcher ML Service")

MODEL_PATH = os.getenv("MODEL_PATH", "cv_job_matcher_final.pkl")

class PredictResponse(BaseModel):
    success: bool
    match: Optional[str]
    score: Optional[float]
    details: Optional[dict]

# Load model at startup
@app.on_event("startup")
def load_model():
    global model
    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model file not found at '{MODEL_PATH}'")
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)


def _read_pdf(file_bytes: bytes) -> str:
    if pdfminer_high_level is None:
        raise RuntimeError("pdfminer.six not installed. Install it to read PDFs.")
    with io.BytesIO(file_bytes) as fh:
        text = pdfminer_high_level.extract_text(fh) or ""
    return text


def _read_docx(file_bytes: bytes) -> str:
    if docx is None:
        raise RuntimeError("python-docx not installed. Install it to read DOCX.")
    with io.BytesIO(file_bytes) as fh:
        document = docx.Document(fh)
        return "\n".join([p.text for p in document.paragraphs])


def _read_txt(file_bytes: bytes) -> str:
    try:
        return file_bytes.decode("utf-8")
    except UnicodeDecodeError:
        return file_bytes.decode("latin-1", errors="ignore")


def extract_text(filename: str, file_bytes: bytes) -> str:
    name = filename.lower()
    if name.endswith(".pdf"):
        return _read_pdf(file_bytes)
    if name.endswith(".docx"):
        return _read_docx(file_bytes)
    if name.endswith(".txt"):
        return _read_txt(file_bytes)
    # Fallback: try as text
    return _read_txt(file_bytes)


@app.post("/predict", response_model=PredictResponse)
async def predict(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="Empty file uploaded")

        cv_text = extract_text(file.filename, content)
        if not cv_text.strip():
            raise HTTPException(status_code=400, detail="Unable to extract text from file")

        # Example model interface: model.predict(cv_text) -> {match, score, details}
        # Adjust this according to your actual model
        if hasattr(model, "predict"):
            result = model.predict(cv_text)
            if isinstance(result, dict):
                return PredictResponse(success=True, **result)
            # If returns (match, score)
            if isinstance(result, (list, tuple)) and len(result) >= 2:
                return PredictResponse(success=True, match=result[0], score=float(result[1]))
            # If returns just match string
            return PredictResponse(success=True, match=str(result))
        else:
            # Dummy example if model is a vectorizer/classifier pipeline
            # Replace this with your actual inference
            return PredictResponse(success=True, match="Unknown", score=0.0, details={"note": "Model has no predict method"})

    except HTTPException as he:
        raise he
    except Exception as e:
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000, reload=True)
