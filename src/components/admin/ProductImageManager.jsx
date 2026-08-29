import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'afa_primelife_product_image_manager_draft';

function safeKey(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '')
    .replace(/^[0-9]+/, '')
    .replace(/^./, (c) => c.toLowerCase()) || 'novaFoto';
}

function quote(value) {
  return JSON.stringify(value ?? '');
}

export default function ProductImageManager() {
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { key: '', name: '', description: '', price: '', category: '', fileName: '' };
    } catch {
      return { key: '', name: '', description: '', price: '', category: '', fileName: '' };
    }
  });
  const [status, setStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const suggestedKey = useMemo(() => safeKey(form.name), [form.name]);
  const photoKey = form.key.trim() || suggestedKey;

  const fileName = form.fileName || `${safeKey(form.name) || 'nova-foto'}.jpg`;
  const importVar = safeKey(photoKey) || 'novaFoto';
  const photoCode = previewUrl
    ? `import ${importVar} from '../assets/products/${fileName}';\n\n// Adicione dentro de PRODUCT_PHOTOS:\n  ${photoKey}: ${importVar},`
    : '';

  const productCode = `  {\n    id: 'NOVO_ID',\n    name: ${quote(form.name || 'Nome do produto')},\n    category: ${quote(form.category || 'cremes')},\n    type: 'cosmetico',\n    segment: 'beleza',\n    variant: 'jar',\n    tone: 'olive',\n    photo: '${photoKey}',\n    price: ${Number(form.price) || 0},\n    oldPrice: null,\n    rating: 5,\n    reviews: 0,\n    tag: 'Novo',\n    desc: ${quote(form.description || 'Descrição do produto.')},\n    benefits: [],\n    stock: true\n  },`;

  const set = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setStatus('Escolha um ficheiro de imagem.');
      return;
    }

    try {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl((current) => { if (current) URL.revokeObjectURL(current); return objectUrl; });
      setForm((current) => ({ ...current, fileName: file.name }));
      setStatus(`Imagem selecionada: ${file.name}. Coloque este ficheiro em src/assets/products/.`);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function copy(text, message) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(message);
    } catch {
      setStatus('Não foi possível copiar automaticamente. Selecione o código e copie.');
    }
  }

  function clearForm() {
    setPreviewUrl((current) => { if (current) URL.revokeObjectURL(current); return ''; });
    setForm({ key: '', name: '', description: '', price: '', category: '', fileName: '' });
    setStatus('Campos limpos.');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f1e7', color: '#2a2118', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 30 }}>Gestor de imagens e produtos</h1>
          <p style={{ margin: '8px 0 0', color: '#6b6152' }}>
            Escolha a fotografia, defina os dados e gere o código de importação. A fotografia deve ficar em src/assets/products/.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 420px)', gap: 20 }}>
          <section style={{ background: '#fff', border: '1px solid #e3d9c4', borderRadius: 16, padding: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Fotografia</label>
            <input type="file" accept="image/*" onChange={handleFile} />

            {previewUrl && (
              <div style={{ marginTop: 14, padding: 12, background: '#f6f1e7', borderRadius: 12, textAlign: 'center' }}>
                <img src={previewUrl} alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: 260, objectFit: 'contain' }} />
              </div>
            )}

            <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
              <label>Chave da foto
                <input value={form.key} onChange={(e) => set('key', e.target.value)} placeholder={suggestedKey} style={inputStyle} />
              </label>
              <label>Nome do produto
                <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ex.: Impressão a cores" style={inputStyle} />
              </label>
              <label>Descrição
                <textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Descrição do produto ou serviço" rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
              </label>
              <label>Preço (MT)
                <input type="number" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="100" style={inputStyle} />
              </label>
              <label>Categoria
                <input value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="cremes" style={inputStyle} />
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
              <button onClick={() => copy(photoCode, 'Código da fotografia copiado.')} disabled={!previewUrl} style={buttonStyle(!previewUrl)}>Copiar fotografia</button>
              <button onClick={() => copy(productCode, 'Código do produto copiado.')} style={buttonStyle(false)}>Copiar produto</button>
              <button onClick={clearForm} style={{ ...buttonStyle(false), background: '#fff', color: '#2a2118' }}>Limpar</button>
            </div>

            {status && <p role="status" style={{ marginTop: 14, color: '#3f4a34' }}>{status}</p>}
          </section>

          <aside style={{ display: 'grid', gap: 20 }}>
            <CodeBox title="1. PRODUCT_PHOTOS.JS" code={photoCode || '// Escolha uma imagem para gerar o código.'} onCopy={() => copy(photoCode, 'Código da fotografia copiado.')} />
            <CodeBox title="2. PRODUCTS.js" code={productCode} onCopy={() => copy(productCode, 'Código do produto copiado.')} />
            <div style={{ background: '#efe6d3', borderRadius: 16, padding: 16, fontSize: 14, lineHeight: 1.55 }}>
              <strong>Como usar</strong>
              <ol style={{ marginBottom: 0 }}>
                <li>Escolha a fotografia.</li>
                <li>Preencha nome, descrição e preço.</li>
                <li>Guarde a fotografia selecionada em <code>src/assets/products/</code>.</li>
                <li>Copie o código de importação para <code>src/data/productPhotos.js</code>.</li>
                <li>Copie o bloco do produto para <code>src/data/products.js</code>.</li>
              </ol>
              <p style={{ marginBottom: 0 }}><strong>O site normal não é alterado.</strong> Esta ferramenta prepara os dados e a referência do ficheiro; a persistência definitiva deve ser feita no projeto/serviço de armazenamento.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function CodeBox({ title, code, onCopy }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e3d9c4', borderRadius: 16, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <strong>{title}</strong>
        <button onClick={onCopy} style={buttonStyle(false)}>Copiar</button>
      </div>
      <textarea value={code} readOnly rows={10} style={{ width: '100%', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, lineHeight: 1.45, padding: 12, border: '1px solid #e3d9c4', borderRadius: 10, background: '#faf9f5', boxSizing: 'border-box' }} />
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  marginTop: 6,
  padding: '11px 12px',
  border: '1px solid #e3d9c4',
  borderRadius: 10,
  background: '#fff',
  color: '#2a2118',
  boxSizing: 'border-box',
  font: 'inherit',
};

const buttonStyle = (disabled) => ({
  border: 0,
  borderRadius: 999,
  padding: '10px 16px',
  background: disabled ? '#cfc8ba' : '#3f4a34',
  color: '#fff',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: 600,
});
