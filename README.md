# Las Motos son Mi passion
## Integrantes
Victoria Molina Martínez 
Daniela Suárez Quirós
## Diseño de Software

# DS MotosSonMiPassion — Correr Localmente

## Requisitos previos

Instalá estas herramientas antes de empezar:

| Herramienta | Link de descarga |
|---|---|
| **nvm-windows** | https://github.com/coreybutler/nvm-windows/releases → `nvm-setup.exe` |
| **AWS CLI** | https://awscli.amazonaws.com/AWSCLIV2.msi |
| **Java 17+** | https://adoptium.net |

---

## Instalación (solo la primera vez)

### 1. Instalar Node 18 con nvm
Abrí PowerShell como **Administrador**:
```powershell
nvm install 18
nvm use 18
```

### 2. Instalar dependencias del proyecto
```powershell
cd <ruta-del-proyecto>
npm install
```

### 3. Instalar Serverless Framework
```powershell
npm install -g serverless
```

### 4. Instalar plugins
```powershell
npm install --save-dev serverless-offline serverless-dynamodb-local
```

### 5. Instalar DynamoDB Local
```powershell
serverless dynamodb install
```
> Si falla la descarga automática, bajá el archivo manualmente desde:
> https://d1ni2b6xgvw0s0.cloudfront.net/v2.x/dynamodb_local_latest.tar.gz
> y extraé el contenido dentro de la carpeta `.dynamodb/` del proyecto.

### 6. Configurar credenciales AWS falsas
```powershell
mkdir "$env:USERPROFILE\.aws" -Force
Set-Content "$env:USERPROFILE\.aws\credentials" "[default]`naws_access_key_id = fake`naws_secret_access_key = fake"
Set-Content "$env:USERPROFILE\.aws\config" "[default]`nregion = us-east-1"
```

### 7. Habilitar ejecución de scripts en PowerShell
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Correr el proyecto

Necesitás **dos terminales** abiertas al mismo tiempo.

### Terminal 1 — Iniciar el servidor
```powershell
nvm use 18
serverless offline start
```
El servidor queda corriendo en `http://localhost:3000` 

### Terminal 2 — Crear la tabla en DynamoDB
> Hacé esto **cada vez** que reiniciés el servidor (los datos son en memoria).

```powershell
aws dynamodb create-table `
  --table-name Partes `
  --attribute-definitions AttributeName=id,AttributeType=S `
  --key-schema AttributeName=id,KeyType=HASH `
  --billing-mode PAY_PER_REQUEST `
  --endpoint-url http://localhost:8000
```

---

## Probar los endpoints

### Crear una parte (POST)
```powershell
Invoke-WebRequest -Uri http://localhost:3000/dev/partes `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"nombre": "Freno", "tipo": "seguridad", "precio": 5000}'
```

### Obtener partes por tipo (GET)
Abrí en el navegador:
```
http://localhost:3000/dev/partes?tipo=seguridad
```

---

## Solución de problemas

**Puerto 8000 ocupado**
```powershell
netstat -ano | findstr :8000
taskkill /PID <numero-que-aparece> /F
```

**`nvm` o `npm` no reconocido**
Cerrá y volvé a abrir PowerShell como Administrador, luego ejecutá `nvm use 18`.

**`serverless` no reconocido en VS Code**
Usá PowerShell de Windows directamente, no la terminal integrada de VS Code.