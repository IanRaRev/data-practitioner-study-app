#!/usr/bin/env python3
"""
Servidor local para Google Cloud Associate Data Practitioner Quiz PWA.
Permite abrir la app en tu iPhone conectado a la misma red WiFi que tu Mac.
"""

import http.server
import socket
import socketserver
import sys
import os

PORT = 8000

def get_local_ip():
    """Detecta la dirección IP local de tu Mac en la red Wi-Fi sin depender de DNS externo."""
    import subprocess
    import re
    try:
        output = subprocess.check_output(['ifconfig']).decode('utf-8')
        ips = re.findall(r'inet (192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+)', output)
        if ips:
            return ips[0]
    except Exception:
        pass

    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Desactivar caché durante desarrollo local si se desea refresco inmediato
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    local_ip = get_local_ip()
    port = PORT

    while port < 8020:
        try:
            with socketserver.TCPServer(("", port), CustomHandler) as httpd:
                print("=" * 64)
                print("🚀 SERVIDOR INICIADO - GCP DATA PRACTITIONER QUIZ")
                print("=" * 64)
                print(f"\n💻 En tu Mac:      http://localhost:{port}")
                print(f"📱 En tu iPhone:   http://{local_ip}:{port}\n")
                print("-" * 64)
                print("PASOS PARA TU IPHONE:")
                print("1. Conecta tu iPhone a la misma red Wi-Fi que este Mac.")
                print("2. Abre SAFARI en tu iPhone y entra a:")
                print(f"   👉 http://{local_ip}:{port}")
                print("3. Toca el botón 'Compartir' (cuadrado con flecha hacia arriba).")
                print("4. Selecciona 'Añadir a pantalla de inicio' (Add to Home Screen).")
                print("=" * 64)
                print("Presiona Ctrl + C para detener el servidor.\n")
                httpd.serve_forever()
        except OSError:
            port += 1

if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido.")
        sys.exit(0)
