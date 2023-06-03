const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler, } = require('./handler');
//1, 2, 3, 4, 5
//ROUTES HANDLER
const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler, //HANDLER MENAMBAHKAN BUKU 1
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler, //HANDLER MENDAPATKAN SELURUH BUKU 2
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler, //HANDLER MENDAPATKAN BUKU BY ID 3
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler, //HANDLER MENGEDIT BUKU BY ID 4
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler, //HANDLER MENGHAPUS BUKU BY ID 5
  },
];

module.exports = routes;