from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from ai_router import analyser_email_entrant
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# Charger les variables d'environnement depuis .env
load_dotenv()

# SÉCURITÉ : Initialisation du Rate Limiter (Protection DDoS / Brute Force)
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="OptiFlux Webhook Receiver")

# Enregistrer le gestionnaire d'erreurs pour le rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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
@limiter.limit("5/minute")
def read_root(request: Request):
    return {"status": "OptiFlux API is running"}

@app.post("/api/webhook/incoming_message")
@limiter.limit("10/minute")
def webhook_receiver(request: Request, webhook_data: IncomingWebhook):
    """
    Point d'entrée simulé pour n8n ou le client Mail.
    Reçoit un email brut et le passe au moteur d'extraction IA.
    """
    analyse_json = analyser_email_entrant(webhook_data.email_content)
    
    # Renvoie un format API standard
    return {
        "status": "success", 
        "data": analyse_json
    }
