const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const config = require('./config.json');

// Configurações
const NOTIFICATION_INTERVAL = 60000; // 1 minuto

class HeartRateMonitor {
  constructor() {
    this.client = new Client();
    this.setupEvents();
  }

  setupEvents() {
    this.client.on('qr', qr => {
      qrcode.generate(qr, { small: true });
      console.log('Escaneie o QR Code com o WhatsApp');
    });

    this.client.on('ready', () => {
      console.log('Cliente WhatsApp conectado!');
      this.startMonitoring();
    });

    this.client.on('disconnected', () => {
      console.log('Cliente desconectado. Reiniciando...');
      this.client.initialize();
    });
  }

  startMonitoring() {
    setInterval(() => {
      this.sendHeartRateUpdate();
    }, NOTIFICATION_INTERVAL);
  }

  async sendHeartRateUpdate() {
    try {
      // Simulação - substituir por dados reais
      const bpm = Math.floor(Math.random() * 60) + 60; 
      
      await this.client.sendMessage(
        config.patientNumber, 
        `Monitoramento Cardíaco:\nBPM Atual: ${bpm}\nHora: ${new Date().toLocaleTimeString()}`
      );
      console.log(`Notificação enviada - BPM: ${bpm}`);
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  }

  initialize() {
    this.client.initialize();
  }
}

// Inicia o monitor
const monitor = new HeartRateMonitor();
monitor.initialize();
