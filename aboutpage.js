document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.skill, .tool, .project');

    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
            element.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    });
});
