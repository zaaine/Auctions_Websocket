const ws = new WebSocket('ws://127.0.0.1:8081');

ws.onopen = () => {
  console.log('Connecté au serveur WebSocket pour les logs');
  ws.send('subscribe-logs');
};

ws.onmessage = async (msg) => {
  try {
    if (typeof msg.data === 'string') {
      
      const newAuction = JSON.parse(msg.data);

         if (newAuction && newAuction.item !== undefined && newAuction.bid !== undefined) {
        
        const logData = {
          username: 'Enchérisseur',
          item_name: newAuction.item, 
          bid_amount: newAuction.bid  
        };
        appendLogToUI(logData);
      } else {
        
        console.log("Message reçu non reconnu comme une enchère :", newAuction);
      }
    }
  } catch (err) {
    console.error('Erreur de parsing du message WebSocket :', err);
  }
};

function appendLogToUI(logData) {
  const list = document.getElementById('logList');
  const item = document.createElement('li');
  
  item.textContent = `Nouvelle enchère sur l'article ${logData.item_name} à ${logData.bid_amount}€`;
  list.prepend(item);
}