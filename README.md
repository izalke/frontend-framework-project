# Projekt: Duck Moto 

![Logo aplikacji (jeśli masz)](src/assets/img/duck-logo.png)

## Opis

**Cel aplikacji:**  

Strona dealera samochodowego

## Struktura folderów
```plaintext
frontend-framework-project-main/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── api/
│   │   ├── __pycache__/
│   │   ├── app.py
│   │   ├── auctionService.tsx
│   │   ├── CarList.tsx
│   │   ├── config.py
│   │   ├── FileList.tsx
│   │   ├── FileUploader.tsx
│   │   ├── firebase.ts
│   │   └── firebaseconfig.json
│   ├── assets/
│   │   ├── img/
│   │   │   ├── pexels-images/
│   │   │   ├── white-background/
│   │   │   └── ... other pictures ...
│   │   └── theme.ts
│   ├── lib\Layout/  
│   │   ├── components/
│   │   │   ├── footer/
│   │   │   │   ├── footerElements.ts
│   │   │   │   └── index.tsx
│   │   │   ├── nav/
│   │   │   │   ├── navElements.ts
│   │   │   │   └── index.tsx
│   │   ├── index.tsx
│   │   └── layoutElements.ts
│   ├── pkg/
│   │   └── index.tsx
│   ├── views
│   │   ├── addcar/
│   │   │   │   ├── addcar.ts
│   │   │   │   └── index.tsx
│   │   ├── auctions/
│   │   │   │   ├── AuctionDetails.ts
│   │   │   │   ├── AuctionDetails.tsx
│   │   │   │   ├── AuctionList.ts
│   │   │   │   ├── AuctionList.tsx
│   │   │   │   ├── Auction.ts
│   │   │   │   ├── Auctions.tsx
│   │   │   │   └── Filters.tsx
│   │   ├── auth/
│   │   │   │   ├── index.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   ├── Chat/
│   │   │   │   ├── chatElemenets.ts
│   │   │   │   └── index.tsx
│   │   ├── gallery/
│   │   │   │   ├── galleryElements.ts
│   │   │   │   └── index.tsx
│   │   ├── Home/
│   │   │   │   ├── homeElements.ts
│   │   │   │   └── index.tsx
│   │   └── NotFound/
│   │   │   │   ├── index.tsx
│   │   │   │   └── notfoundElements.ts
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── AuthContext.tsx
│   ├── index.tsx
│   ├── react-app-end.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── package.json
├── README.md
└── ...
```

# Zależności i konfiguracja projektu

## Funkcjonalności

1. **Logowanie**  
   Logowanie i rejestracja użytkowników.

2. **Aukcje**  
   Dealer wystawia aukcje na sprzedaż, a klient (użytkownik) może dane do samochodów dostępnych do sprzedaży.

3. **Galeria**  
   Galeria zdjęć.

4. **Chat**  
   Możliwość prowadzenia rozmowy klienta w formie chatu z doradcami.

5. **Informacje kontaktowe**  
   Funkcja reklamowa i prezentacyjna firmy.

## Instalacja

Aby zainstalować i uruchomić aplikację lokalnie, wykonaj poniższe kroki:

1. Sklonuj repozytorium:
    ```bash
    git clone https://github.com/izalke/frontend-framework-project.git
    ```
2. Zainstaluj zależności:
    ```bash
    npm install
    ```
3. Jeśli nie masz python, zainstaluj go.
4. Zainstaluj Flask
    ```bash
    pip install flask
    ```
5. Uruchom i jeśli pojawią się błędy doinstaluj potrzebne rzeczy:
    ```bash
    flask --app src/api/app.py run
    ```
6. Uruchom aplikację:
    ```bash
    npm start
    ```
    
Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

API będzie dostępna pod adresem `http://localhost:5000`.

# frontend-framework-project
