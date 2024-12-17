const { Client } = require("minecraft-launcher-core");
const { Auth } = require("msmc");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const launcher = new Client();
const authManager = new Auth("select_account");

// Configuration du chemin de Java local (au cas où il n'est pas globalement installé)
const JAVA_INSTALL_PATH = path.resolve("./java21/bin/java.exe");

// Fonction pour vérifier si Java est accessible globalement
function getJavaPath() {
    try {
        execSync("java -version", { stdio: "ignore" });
        return "java"; // Java est globalement disponible
    } catch (err) {
        if (fs.existsSync(JAVA_INSTALL_PATH)) {
            return JAVA_INSTALL_PATH; // Utilise Java localement installé
        } else {
            console.error("Java n'est pas installé. Assurez-vous d'avoir Java 21.");
            process.exit(1);
        }
    }
}

async function launchMc() {
    try {
        console.log("Démarrage de l'authentification Microsoft...");

        // Démarre le processus OAuth pour Microsoft
        const xboxManager = await authManager.launch("raw");

        // Récupère le token Minecraft
        const token = await xboxManager.getMinecraft();

        // Options de lancement
        const opts = {
            clientPackage: null,
            authorization: token.mclc(), // Convertit le token MSMC en format MCLC
            root: "./.urusium", // Dossier de jeu
            version: {
                number: "1.20.1",
                type: "release",
            },
            javaPath: getJavaPath(), // Chemin vers Java
            memory: {
                max: "6G",
                min: "4G",
            },
        };

        console.log("Authentification réussie, lancement du jeu...");
        launcher.launch(opts);

        // Gère les événements pour le débogage et les logs
        launcher.on("debug", (e) => console.log(`[DEBUG] ${e}`));
        launcher.on("data", (e) => console.log(`[DATA] ${e}`));
    } catch (error) {
        console.error("Erreur lors du lancement :", error.message);
    }
}

module.exports = launchMc;