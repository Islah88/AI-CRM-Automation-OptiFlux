"use client";

import { useState } from "react";

export default function CRMDashboard() {
  const [emailText, setEmailText] = useState("Bonjour,\n\nJe n'ai toujours pas reçu la facture pour ma commande de matériel informatique (PC Dell XPS) passée le mois dernier. Pourriez-vous me l'envoyer rapidement s'il vous plaît ?\n\nMerci,\nJean Dupont\nTechSolutions SARL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("inbox");

  const simulateIncomingWebhook = async () => {
    if (!emailText) return;
    setIsProcessing(true);
    setTicketData(null);
    try {
      const res = await fetch("http://localhost:8000/api/webhook/incoming_message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_content: emailText })
      });
      const data = await res.json();
      setTicketData(data.data); // data.data car l'API renvoie {status: "success", data: {...}}
    } catch (e) {
      alert("Erreur: Le Backend FastAPI n'est pas lancé sur le port 8000.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-800 font-sans flex">
      {/* Sidebar (Navigation) */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col shadow-sm shrink-0">
        <h2 className="text-2xl font-black mb-8 text-[#2563eb] tracking-tight">OptiFlux<span className="text-gray-800">.ai</span></h2>
        <div className="space-y-2 text-sm font-semibold">
          <p onClick={() => setActiveTab("inbox")} className={`p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'inbox' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-600'}`}>
            📥 Boîte de Réception {activeTab === 'inbox' && <span className="float-right bg-blue-600 text-white rounded-full px-2 text-xs">1</span>}
          </p>
          <p onClick={() => setActiveTab("devis")} className={`p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'devis' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-600'}`}>💼 Devis en cours</p>
          <p onClick={() => setActiveTab("reclamations")} className={`p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'reclamations' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-600'}`}>⚠️ Réclamations</p>
          <p onClick={() => setActiveTab("n8n")} className={`p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'n8n' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-600'}`}>⚙️ Workflows n8n</p>
        </div>
        
        <div className="mt-auto">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Statut IA</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium">Llama-3.3 Actif</span>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* TAB 1 : INBOX */}
        {activeTab === "inbox" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Gestion ADV Automatisée</h1>
                <p className="text-gray-500 mt-1">Démonstration de routage intelligent via Webhook et IA Générative.</p>
              </div>
              <span className="bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full font-bold border border-green-200 shadow-sm flex items-center gap-2">
                 <span>⚡</span> Endpoint Webhook Prêt
              </span>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Column 1: Simuler un Email Entrant */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📧</span>
                    <h3 className="text-xl font-bold">Simulateur Email Client</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6 font-medium">Testez l'analyse du nœud IA (comme dans un workflow n8n).</p>
                
                <textarea 
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  className="w-full h-56 p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm mb-6 bg-gray-50 resize-none font-medium text-gray-700 leading-relaxed"
                  placeholder="Rédigez le message du client ici..."
                />
                
                <button 
                  onClick={simulateIncomingWebhook}
                  disabled={isProcessing}
                  className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin text-xl">⚙️</span> Analyse IA en cours...
                    </>
                  ) : (
                    "📩 Simuler Réception (Appel API)"
                  )}
                </button>
              </div>

              {/* Column 2: CRM Output */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 relative transition-shadow hover:shadow-md">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-2xl">🤖</span> Traitement IA Automatisé
                </h3>
                
                {!ticketData ? (
                  <div className="h-56 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                    <span className="text-4xl mb-3 opacity-50">📫</span>
                    <p className="font-medium">En attente d'un nouveau message entrant...</p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* En-tête du Ticket */}
                    <div className="flex justify-between items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Entreprise Identifiée</h4>
                        <p className="font-black text-xl text-gray-800">{ticketData.entreprise_cliente}</p>
                      </div>
                      <div className="text-right">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Intention (Classification)</h4>
                        <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold border border-purple-200">
                          {ticketData.intention}
                        </span>
                      </div>
                    </div>

                    {/* Urgence et Action */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-xl border ${ticketData.urgence === 'Haute' ? 'bg-red-50 border-red-200' : ticketData.urgence === 'Moyenne' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Priorité SLA</span>
                        <span className={`font-black text-lg ${ticketData.urgence === 'Haute' ? 'text-red-700' : ticketData.urgence === 'Moyenne' ? 'text-orange-700' : 'text-green-700'}`}>
                          {ticketData.urgence === 'Haute' ? '🔥 ' : ''}{ticketData.urgence}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Routage n8n Conseillé</span>
                        <span className="font-bold text-blue-800">{ticketData.action_requise}</span>
                      </div>
                    </div>

                    {/* Brouillon IA */}
                    <div className="mt-6">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                         <span className="text-blue-500">✨</span> Brouillon de réponse généré
                      </h4>
                      <div className="p-5 bg-yellow-50/50 border border-yellow-100 rounded-xl text-sm text-gray-800 whitespace-pre-wrap shadow-inner leading-relaxed font-medium">
                        {ticketData.brouillon_reponse}
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                      <button className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Modifier manuellement</button>
                      <button className="px-5 py-2.5 text-sm font-bold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all flex items-center gap-2">
                        <span>✓</span> Valider & Envoyer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 : N8N WORKFLOWS */}
        {activeTab === "n8n" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Workflows n8n (Orchestration)</h1>
                <p className="text-gray-500 mt-1">Supervision des flux d'automatisation connectés à l'IA.</p>
              </div>
              <button className="bg-[#ff6e5f] hover:bg-[#ff5c4a] text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                <span>+</span> Nouveau Workflow
              </button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <div className="absolute inset-0 bg-gray-50/90 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="flex items-center justify-center gap-4 mb-10 w-full relative">
                   {/* Pointiller line in background */}
                   <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-300 -z-10"></div>
                   
                   <div className="w-20 h-20 bg-white border-2 border-gray-300 rounded-xl shadow-sm flex flex-col items-center justify-center z-10 relative">
                     <span className="text-3xl">📧</span>
                     <span className="absolute -bottom-6 text-[11px] font-bold text-gray-600 whitespace-nowrap">Email Trigger</span>
                   </div>
                   
                   <div className="w-16 h-1 bg-blue-500 relative flex items-center justify-center z-10">
                     <span className="absolute -top-6 text-[10px] font-bold text-blue-600 bg-white px-2 rounded-full border border-blue-200">Webhook</span>
                     <span className="absolute -right-1 w-3 h-3 border-t-2 border-r-2 border-blue-500 rotate-45"></span>
                   </div>
                   
                   <div className="w-24 h-24 bg-blue-50 border-2 border-blue-500 rounded-2xl shadow-lg flex flex-col items-center justify-center z-10 relative ring-4 ring-blue-500/20">
                     <span className="text-4xl mb-1">🤖</span>
                     <span className="text-[12px] font-black text-blue-800">Llama 3</span>
                     <span className="absolute -bottom-7 text-[11px] font-bold text-gray-600 whitespace-nowrap">Data Extraction Node</span>
                   </div>
                   
                   <div className="w-16 h-1 bg-green-500 relative flex items-center justify-center z-10">
                     <span className="absolute -top-6 text-[10px] font-bold text-green-600 bg-white px-2 rounded-full border border-green-200">JSON</span>
                     <span className="absolute -right-1 w-3 h-3 border-t-2 border-r-2 border-green-500 rotate-45"></span>
                   </div>
                   
                   <div className="w-20 h-20 bg-white border-2 border-gray-300 rounded-xl shadow-sm flex flex-col items-center justify-center z-10 relative">
                     <span className="text-3xl">📝</span>
                     <span className="absolute -bottom-6 text-[11px] font-bold text-gray-600 whitespace-nowrap">Zendesk / CRM</span>
                   </div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-800 mt-6 mb-2">Workflow "Routage ADV" Actif</h3>
                <p className="text-gray-500 font-medium mb-8 max-w-xl leading-relaxed">Ce workflow intercepte automatiquement les emails clients, utilise Llama-3 pour extraire les données structurées de la requête, puis crée un ticket pré-rempli dans le CRM.</p>
                
                <div className="flex gap-4">
                   <button className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all">Logs d'exécution</button>
                   <button className="px-6 py-2.5 bg-[#ff6e5f] border border-[#ff6e5f] rounded-lg font-bold text-white hover:bg-[#ff5c4a] shadow-md transition-all flex items-center gap-2">
                     Éditer le flow dans n8n <span>➔</span>
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 : DEVIS EN COURS */}
        {activeTab === "devis" && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center h-[500px] text-gray-400">
              <span className="text-6xl mb-4">💼</span>
              <h2 className="text-2xl font-bold text-gray-600 mb-2">Devis en cours</h2>
              <p>Module de suivi des devis générés par l'IA (en construction).</p>
           </div>
        )}

        {/* TAB 4 : RECLAMATIONS */}
        {activeTab === "reclamations" && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center h-[500px] text-gray-400">
              <span className="text-6xl mb-4 text-orange-400">⚠️</span>
              <h2 className="text-2xl font-bold text-gray-600 mb-2">Réclamations urgentes</h2>
              <p>File d'attente des réclamations détectées par Llama-3. Aucune réclamation en attente.</p>
           </div>
        )}

      </div>
    </div>
  );
}
