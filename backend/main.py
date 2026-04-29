from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai_router import analyser_email_entrant

app = FastAPI(title="OptiFlux Webhook Receiver")

# CORS pour autoriser le CRM Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IncomingWebhook(BaseModel):
    email_content: str

@app.get("/")
def read_root():
    return {"status": "OptiFlux API is running"}

@app.post("/api/webhook/incoming_message")
def webhook_receiver(request: IncomingWebhook):
    """
    Point d'entrée simulé pour n8n ou le client Mail.
    Reçoit un email brut et le passe au moteur d'extraction IA.
    """
    analyse_json = analyser_email_entrant(request.email_content)
    
    # Renvoie un format API standard
    return {
        "status": "success", 
        "data": analyse_json
    }
