# 🚀 AI-CRM-Automation-OptiFlux

![OptiFlux Dashboard](https://islah88.github.io/images/optiflux.png)

## 📌 À Propos du Projet
**OptiFlux CRM** est une preuve de concept (PoC) "Enterprise-Ready" démontrant une expertise pointue en **automatisation de processus (ADV & CRM)** et en **intégration d'IA générative**. Ce projet simule un flux de travail similaire à ce que l'on pourrait construire avec **n8n**, mais en utilisant une architecture sur-mesure robuste.

L'objectif : automatiser le tri, l'extraction de données et le routage des emails clients entrants (réclamations, demandes de devis, etc.) grâce au *Structured Output* d'un LLM (Llama-3).

---

## 🏗️ Architecture Technique

Le projet est divisé en deux parties : un moteur de routage intelligent (Backend) et un tableau de bord de supervision (Frontend).

- **Backend (Moteur d'IA & Webhook)** : `FastAPI` (Python)
- **Frontend (Tableau de Bord CRM)** : `Next.js` (React, TypeScript), `TailwindCSS`
- **Intelligence Artificielle** : `Llama-3` via l'API `Groq`
- **Orchestration / Validation Data** : `LangChain`, `Pydantic` (pour forcer le LLM à répondre en JSON structuré)

---

## ✨ Fonctionnalités Principales

1. **Endpoint Webhook Intelligent (FastAPI)** : Réception simulée des emails clients.
2. **Extraction de Données Structurées (Pydantic + Llama-3)** : Le système lit l'email et extrait :
   - L'intention principale (Urgence, Devis, Réclamation...).
   - Le niveau de priorité (Basse, Normale, Haute, Critique).
   - Un résumé concis.
   - Une proposition de réponse en brouillon.
3. **Tableau de Bord "Hubspot/Zendesk-like" (Next.js)** : Interface réactive permettant aux équipes ADV (Administration des Ventes) de superviser les requêtes triées en temps réel.
4. **Temps de Réponse Ultra-Rapide** : Utilisation de Llama-3 via Groq pour un traitement en quelques millisecondes, essentiel pour les flux d'automatisation haute fréquence.

---

## ⚙️ Installation & Lancement Local

### Prérequis
- `Python 3.10+`
- `Node.js 18+`
- Une clé API Groq (`GROQ_API_KEY`)

### 1. Démarrer le Backend (Moteur IA)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Sur Windows : venv\Scripts\activate
pip install -r requirements.txt

# Configurer la clé API
echo "GROQ_API_KEY=votre_cle_ici" > .env

# Lancer FastAPI
uvicorn main:app --reload
```
*L'API sera disponible sur `http://localhost:8000`*

### 2. Démarrer le Frontend (Dashboard)
```bash
cd frontend
npm install
npm run dev
```
*Le tableau de bord sera accessible sur `http://localhost:3000`*

---

## 💼 Contexte de Réalisation & Objectif
Ce projet a été développé pour illustrer des compétences avancées en **ingénierie IA et automatisation**, avec un focus particulier sur les besoins métiers (ADV, support client). Il démontre une capacité à :
- Comprendre les enjeux métiers liés à la gestion des flux d'information.
- Concevoir des solutions techniques robustes (API, Webhooks).
- Implémenter l'IA de manière déterministe (sans hallucination) dans un processus métier.

---

*Ce projet fait partie de mon portfolio professionnel d'Ingénieur IA / Automatisation.*
