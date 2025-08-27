import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState('');

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/admin/collections`);
        setCollections(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCollections();
  }, []);

  const fetchDocuments = async (collection) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/admin/collections/${collection}`);
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCollectionChange = (e) => {
    const collection = e.target.value;
    setSelectedCollection(collection);
    fetchDocuments(collection);
  };

  const handleAddDocument = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/admin/collections/${selectedCollection}`, JSON.parse(newDocument));
      fetchDocuments(selectedCollection);
      setNewDocument('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/collections/${selectedCollection}/${id}`);
      fetchDocuments(selectedCollection);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <select onChange={handleCollectionChange}>
        <option value="">Select a collection</option>
        {collections.map((collection) => (
          <option key={collection} value={collection}>
            {collection}
          </option>
        ))}
      </select>

      {selectedCollection && (
        <div>
          <h3>Documents in {selectedCollection}</h3>
          <ul>
            {documents.map((doc) => (
              <li key={doc._id}>
                <pre>{JSON.stringify(doc, null, 2)}</pre>
                <button onClick={() => handleDeleteDocument(doc._id)}>Delete</button>
              </li>
            ))}
          </ul>

          <h3>Add a new document</h3>
          <textarea
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
            placeholder="Enter a valid JSON object"
          />
          <button onClick={handleAddDocument}>Add Document</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
