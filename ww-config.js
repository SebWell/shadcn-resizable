export default {
    editor: {
        label: 'resizable',
        icon: 'cube',
    },
    triggerEvents: [
        { name: 'click', label: 'On Click', event: { value: '' }, default: true },
    ],
    properties: {
        content: {
            label: 'Content',
            type: 'Object',
            section: 'settings',
            bindable: true,
            defaultValue: {}
        }
    }
};
