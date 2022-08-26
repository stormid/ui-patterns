export const initIFrame = () => {
    [].slice.call(document.querySelectorAll('[data-iframe-src]')).forEach(node => {
        const iframe = document.createElement('iframe');
        iframe.src = node.getAttribute('data-iframe-src');
        iframe.setAttribute('title', node.getAttribute('data-iframe-title') || 'iFrame embed');
        iframe.style.width =  node.getAttribute('data-iframe-width' || '100%');
        iframe.setAttribute('tabindex', '0');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('webkitallowfullscreen', 'webkitallowfullscreen');
        iframe.setAttribute('mozallowfullscreen', 'mozallowfullscreen');
        iframe.setAttribute('allowfullscreen', 'allowfullscreen');
        iframe.setAttribute('scrolling', 'no');
        node.parentNode.appendChild(iframe);
        node.parentNode.removeChild(node);
    });
};