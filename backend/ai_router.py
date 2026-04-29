import os
from pydantic import BaseModel, Field
from langchain_groq import ChatGroq

# ==============================================================================
# SCHEMA PYDANTIC (Output Structuré pour n8n / CRM)
# ==============================================================================
# L'un des plus grands défis en automatisation n8n est d'avoir des données
# prédictibles. En utilisant Pydantic, nous forçons Llama-3 à toujours 
# retourner un JSON avec exactement ces clés.
class TicketAnalyse(BaseModel):
    intention: str = Field(description="Catégorie exacte : 'Demande de Devis', 'Réclamation', 'Support Technique', 'Relance Facture', 'Autre'.")
    entreprise_cliente: str = Field(description="Nom de l'entreprise cliente si mentionné dans le texte, sinon 'Inconnu'.")
    urgence: str = Field(description="Niveau d'urgence : 'Haute', 'Moyenne', 'Faible'. (Réclamation/Facture = Haute/Moyenne)")
    brouillon_reponse: str = Field(description="Un projet de réponse courtois de 2 à 3 phrases, prêt à être envoyé par le commercial pour faire gagner du temps.")
    action_requise: str = Field(description="Action conseillée au CRM : 'Assigner au Support', 'Alerter le Commercial', 'Envoi Automatique'.")

# ==============================================================================
# MOTEUR DE ROUTAGE IA
# ==============================================================================
def analyser_email_entrant(email_texte: str) -> dict:
    """
    Simule le noeud IA dans n8n. Prend un texte brut et renvoie un JSON structuré.
    """
    # Instanciation du LLM (Llama 3.3 est ultra rapide pour ces tâches d'extraction)
    llm = ChatGroq(model_name="llama-3.3-70b-versatile", temperature=0)
    
    # On force le modèle à cracher le format exact du Pydantic
    structured_llm = llm.with_structured_output(TicketAnalyse)
    
    prompt = f"""Tu es un assistant IA intégré au CRM d'une entreprise (OptiFlux).
    Ton rôle est d'analyser les emails entrants de l'Administration des Ventes (ADV) 
    et de structurer l'information pour automatiser le traitement via n8n.
    
    EMAIL REÇU :
    ---------------------
    {email_texte}
    ---------------------
    
    Analyse ce message et extrais les informations selon le schéma demandé.
    """
    
    # Exécution de la chaîne
    resultat = structured_llm.invoke(prompt)
    
    # On retourne un dictionnaire standard (sérialisable en JSON par FastAPI)
    return resultat.dict()
