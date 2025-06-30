export default {
  editor: {
    label: {
      en: 'Resizable',
      fr: 'Redimensionnable'
    },
    icon: 'move-3d',
    bubble: {
      icon: 'move-3d'
    }
  },
  triggerEvents: [
    { name: 'resize', label: { en: 'On resize', fr: 'Lors du redimensionnement' } },
    { name: 'resizeStart', label: { en: 'On resize start', fr: 'Lors du début du redimensionnement' } },
    { name: 'resizeEnd', label: { en: 'On resize end', fr: 'Lors de la fin du redimensionnement' } }
  ],
  properties: {
    // Configuration
    direction: {
      label: { en: 'Direction', fr: 'Direction' },
      type: 'TextSelect',
      options: {
        choices: [
          { value: 'horizontal', label: { en: 'Horizontal', fr: 'Horizontal' } },
          { value: 'vertical', label: { en: 'Vertical', fr: 'Vertical' } }
        ]
      },
      defaultValue: 'horizontal',
      bindable: true,
      section: 'layout'
    },
    
    // Dimensions
    height: {
      label: { en: 'Container height', fr: 'Hauteur du conteneur' },
      type: 'Text',
      defaultValue: '400px',
      bindable: true,
      section: 'dimensions'
    },
    width: {
      label: { en: 'Container width', fr: 'Largeur du conteneur' },
      type: 'Text',
      defaultValue: '100%',
      bindable: true,
      section: 'dimensions'
    },
    
    // Panel sizes
    defaultSize: {
      label: { en: 'Default size (px)', fr: 'Taille par défaut (px)' },
      type: 'Number',
      defaultValue: 300,
      bindable: true,
      section: 'sizing'
    },
    minSize: {
      label: { en: 'Min size (px)', fr: 'Taille minimale (px)' },
      type: 'Number',
      defaultValue: 100,
      bindable: true,
      section: 'sizing'
    },
    maxSize: {
      label: { en: 'Max size (px)', fr: 'Taille maximale (px)' },
      type: 'Number',
      defaultValue: 800,
      bindable: true,
      section: 'sizing'
    },
    minSecondPanelSize: {
      label: { en: 'Min second panel size (px)', fr: 'Taille minimale du second panneau (px)' },
      type: 'Number',
      defaultValue: 100,
      bindable: true,
      section: 'sizing'
    },
    
    // Resizer appearance
    variant: {
      label: { en: 'Resizer variant', fr: 'Variante du redimensionneur' },
      type: 'TextSelect',
      options: {
        choices: [
          { value: 'line', label: { en: 'Line', fr: 'Ligne' } },
          { value: 'handle', label: { en: 'Handle', fr: 'Poignée' } },
          { value: 'invisible', label: { en: 'Invisible', fr: 'Invisible' } }
        ]
      },
      defaultValue: 'line',
      bindable: true,
      section: 'resizer'
    },
    showTooltip: {
      label: { en: 'Show resize tooltip', fr: 'Afficher l\'info-bulle de redimensionnement' },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'resizer'
    },
    
    // Panel content
    firstPanelContent: {
      label: { en: 'First panel content', fr: 'Contenu du premier panneau' },
      type: 'LongText',
      defaultValue: '<div class="flex h-full items-center justify-center bg-muted/50 text-muted-foreground">First Panel</div>',
      bindable: true,
      multiLang: true,
      section: 'content'
    },
    secondPanelContent: {
      label: { en: 'Second panel content', fr: 'Contenu du second panneau' },
      type: 'LongText',
      defaultValue: '<div class="flex h-full items-center justify-center bg-muted/30 text-muted-foreground">Second Panel</div>',
      bindable: true,
      multiLang: true,
      section: 'content'
    },
    
    // Behavior
    disabled: {
      label: { en: 'Disabled', fr: 'Désactivé' },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'behavior'
    },
    
    // Style classes
    customClass: {
      label: { en: 'Custom CSS class', fr: 'Classe CSS personnalisée' },
      type: 'Text',
      section: 'style'
    },
    firstPanelClass: {
      label: { en: 'First panel CSS class', fr: 'Classe CSS du premier panneau' },
      type: 'Text',
      section: 'style'
    },
    secondPanelClass: {
      label: { en: 'Second panel CSS class', fr: 'Classe CSS du second panneau' },
      type: 'Text',
      section: 'style'
    },
    resizerClass: {
      label: { en: 'Resizer CSS class', fr: 'Classe CSS du redimensionneur' },
      type: 'Text',
      section: 'style'
    }
  },
  
  defaultContent: {
    direction: 'horizontal',
    height: '400px',
    width: '100%',
    defaultSize: 300,
    minSize: 100,
    maxSize: 800,
    minSecondPanelSize: 100,
    variant: 'line',
    showTooltip: false,
    firstPanelContent: '<div class="flex h-full items-center justify-center bg-muted/50 text-muted-foreground">First Panel</div>',
    secondPanelContent: '<div class="flex h-full items-center justify-center bg-muted/30 text-muted-foreground">Second Panel</div>',
    disabled: false,
    customClass: '',
    firstPanelClass: '',
    secondPanelClass: '',
    resizerClass: ''
  },
  
  settingsOptions: {
    autoByContent: true
  },
  
  actions: [
    {
      label: { en: 'Reset size', fr: 'Réinitialiser la taille' },
      action: 'reset'
    },
    {
      label: { en: 'Collapse', fr: 'Réduire' },
      action: 'collapse'
    },
    {
      label: { en: 'Expand', fr: 'Étendre' },
      action: 'expand'
    },
    {
      label: { en: 'Set size', fr: 'Définir la taille' },
      action: 'setSize'
    }
  ]
} 