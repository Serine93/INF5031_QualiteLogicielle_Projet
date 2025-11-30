module.exports = {
    default: {
      // Tous les fichiers .feature
      paths: ['features/**/*.feature'],
  
      // Pour exécuter TypeScript
      requireModule: ['ts-node/register'],
  
      // Charger les steps + le dossier support à la racine
      require: [
        'features/step_definitions/**/*.ts',
        'support/**/*.ts'
      ],
  
      format: ['progress'],
      worldParameters: {}
    }
  };
  