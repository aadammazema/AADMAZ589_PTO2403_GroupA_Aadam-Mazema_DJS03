class BookPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // Setter to handle the incoming book data
    set bookData(data) {
        this._bookData = data;
        this.render();  // Re-render the component when book data is set
    }

    // Getter for the book data
    get bookData() {
        return this._bookData;
    }

    // Renders the HTML for the custom element
    render() {
        if (!this._bookData) return;

        const { image, title, author } = this._bookData;

        this.shadowRoot.innerHTML = `
            <style>
                /* Book Preview Styles */
                .preview {
                    border-width: 0;
                    width: 100%;
                    font-family: Roboto, sans-serif;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    text-align: left;
                    border-radius: 8px;
                    border: 1px solid rgba(var(--color-dark), 0.15);
                    background: rgba(var(--color-light), 1);
                    box-sizing: border-box;
                }

                .preview:hover {
                    background: rgba(var(--color-blue), 0.05);
                }

                .preview__image {
                    width: 48px;
                    height: 70px;
                    object-fit: cover;
                    background: grey;
                    border-radius: 2px;
                    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                        0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
                }

                .preview__info {
                    margin-left: 1rem;
                    display: flex;
                    flex-direction: column;
                }

                .preview__title {
                    margin: 0 0 0.5rem;
                    font-weight: bold;
                    color: rgba(var(--color-dark), 0.8);
                    font-size: 1rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .preview__author {
                    color: rgba(var(--color-dark), 0.6);
                    font-size: 0.875rem;
                }
            </style>

            <div class="preview">
                <img class="preview__image" src="${image}" alt="${title}" />
                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${author}</div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        // Render the component initially if data is provided
        if (this._bookData) {
            this.render();
        }
    }
}

customElements.define('book-preview', BookPreview);

  