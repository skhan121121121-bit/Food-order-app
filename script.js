body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f2f2f2;
}

header {
  background: #ff5722;
  color: white;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#cartBtn {
  background: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
}

#search {
  width: 90%;
  margin: 10px auto;
  display: block;
  padding: 10px;
}

.food-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  padding: 10px;
}

.food {
  background: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.food button {
  width: 100%;
  padding: 8px;
  border: none;
  background: #4caf50;
  color: white;
  border-radius: 5px;
}

.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
}

.modal-box {
  background: white;
  width: 90%;
  max-width: 400px;
  margin: 40px auto;
  padding: 15px;
  border-radius: 8px;
}

.modal-box input,
.modal-box textarea {
  width: 100%;
  margin: 5px 0;
  padding: 8px;
}

.modal-box button {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}

.close {
  background: #ccc;
}
