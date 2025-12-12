<script setup lang="ts">
import { ref } from "vue";

const formData = ref({
  nom: "",
  prenom: "",
  email: "",
  motDePasse: "",
  confirmationMotDePasse: "",
});

const message = ref("");
const messageType = ref<"success" | "error">("success");

const validateForm = () => {
  if (
    !formData.value.nom ||
    !formData.value.prenom ||
    !formData.value.email ||
    !formData.value.motDePasse
  ) {
    message.value = "Tous les champs sont obligatoires";
    messageType.value = "error";
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    message.value = "Email invalide";
    messageType.value = "error";
    return false;
  }

  if (formData.value.motDePasse.length < 6) {
    message.value = "Le mot de passe doit contenir au moins 6 caractères";
    messageType.value = "error";
    return false;
  }

  if (formData.value.motDePasse !== formData.value.confirmationMotDePasse) {
    message.value = "Les mots de passe ne correspondent pas";
    messageType.value = "error";
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  message.value = "";

  if (!validateForm()) {
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: formData.value.nom,
        prenom: formData.value.prenom,
        email: formData.value.email,
        motDePasse: formData.value.motDePasse,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      message.value = "Inscription réussie !";
      messageType.value = "success";
      // Réinitialiser le formulaire
      formData.value = {
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        confirmationMotDePasse: "",
      };
    } else {
      message.value = data.message || "Erreur lors de l'inscription";
      messageType.value = "error";
    }
  } catch (error) {
    message.value = "Erreur de connexion au serveur";
    messageType.value = "error";
    console.error("Erreur:", error);
  }
};
</script>

<template>
  <div class="registration-container">
    <div class="registration-card">
      <h2>Formulaire d'inscription</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nom">Nom *</label>
          <input
            id="nom"
            v-model="formData.nom"
            type="text"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div class="form-group">
          <label for="prenom">Prénom *</label>
          <input
            id="prenom"
            v-model="formData.prenom"
            type="text"
            placeholder="Entrez votre prénom"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="exemple@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="motDePasse">Mot de passe *</label>
          <input
            id="motDePasse"
            v-model="formData.motDePasse"
            type="password"
            placeholder="Minimum 6 caractères"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirmationMotDePasse"
            >Confirmer le mot de passe *</label
          >
          <input
            id="confirmationMotDePasse"
            v-model="formData.confirmationMotDePasse"
            type="password"
            placeholder="Confirmer votre mot de passe"
            required
          />
        </div>

        <button type="submit" class="submit-btn">S'inscrire</button>
      </form>

      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.registration-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #42b883;
}

input::placeholder {
  color: #999;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #35a372;
}

.submit-btn:active {
  transform: translateY(1px);
}

.message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
