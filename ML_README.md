# Local ML Integration

This project includes a Python FastAPI service and a Node.js Backend bridge route to process CV files and return a job match.

## FastAPI Service (Python)
- Path: `ml-service/`
- Runs at: `http://127.0.0.1:5000`
- Model file: place `cv_job_matcher_final.pkl` inside `ml-service/` or set `MODEL_PATH` env.

Install & run:
```powershell
python -m venv ml-service\.venv
ml-service\.venv\Scripts\activate
pip install -r ml-service\requirements.txt
copy d:\path\to\cv_job_matcher_final.pkl ml-service\
python ml-service\main.py
```

Test directly:
```powershell
curl -X POST http://127.0.0.1:5000/predict -F "file=@d:/path/to/cv.pdf"
curl -X POST http://127.0.0.1:5000/predict -F "file=@d:/path/to/cv.docx"
curl -X POST http://127.0.0.1:5000/predict -F "file=@d:/path/to/cv.txt"
```

## Node.js Backend Forwarding
- Backend exposes: `POST /api/ml/match` (form-data: `cvFile`)
- Forwards to FastAPI and returns JSON result.
- Set `ML_HOST` in `Backend/.env` (default `http://127.0.0.1:5000`).

Run backend:
```powershell
$env:ML_HOST='http://127.0.0.1:5000'
npm run backend:dev
```

Test via Backend:
```powershell
curl -X POST http://127.0.0.1:5000/api/ml/match -F "cvFile=@d:/path/to/cv.pdf"
```

## File Handling Guidance
- PDF: parsed via `pdfminer.six`. Best for text-based PDFs.
- DOCX: parsed via `python-docx`. Often cleaner text.
- TXT: fastest and simplest.
- DOC (legacy): convert to DOCX or PDF before upload.

If your CV is a scanned image PDF, consider OCR (e.g., Tesseract) in future.
