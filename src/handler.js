const { nanoid } = require('nanoid');
const books = require('./books');

//CODE MENAMBAHKAN BUKU 1
const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (typeof name === 'undefined') {
    const response = h.response({
      status: 'fail',
      message: 'GAGAL MENAMBAHKAN BUKU. MOHON ISI NAMA BUKU!',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'GAGAL MENAMBAHKAN BUKU. readPage TIDAK BOLEH BESAR DARI pageCount',
    });

    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'BUKU SUKSES DITAMBAHKAN!',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'BUKU GAGAL DITAMBAHKAN!',
  });

  response.code(500);
  return response;
};

//CODE MENDAPATKAN INFO SELURUH BUKU 2
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (books.length === 0) {
    const response = h.response({
      status: 'success',
      data: {
        books: [],
      },
    });

    response.code(200);
    return response;
  }

  let filterBook = books;

  if (typeof name !== 'undefined') {
    filterBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (typeof reading !== 'undefined') {
    filterBook = books.filter((book) => Number(book.reading) === Number(reading));
  }

  if (typeof finished !== 'undefined') {
    filterBook = books.filter((book) => Number(book.finished) === Number(finished));
  }

  const listBook = filterBook.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = h.response({
    status: 'success',
    data: {
      books: listBook,
    },
  });

  response.code(200);
  return response;
};

//CODE MENDAPATKAN BUKU BY ID 3
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (typeof book !== 'undefined') {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'BUKU GAGAL DITEMUKAN',
  });

  response.code(404);
  return response;
};

//CODE EDIT BUKU BY ID 4
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (typeof name === 'undefined') {
    const response = h.response({
      status: 'fail',
      message: 'GAGAL MENGUPDATE BUKU. SILAHKAN ISI NAMA BUKU',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'GAGAL MENGUPDATE BUKU. readPage TIDAK BOLEH LEBIH BESAR DARI pageCount',
    });

    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'BUKU BERHASIL DIUPDATE',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'GAGAL MENGUPDATE BUKU. ID GAGAL DITEMUKAN',
  });

  response.code(404);
  return response;
};

//CODE MENGAPUS BUKU BY ID 5
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'BUKU TELAH DIHAPUS',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'BUKU TIDAK DAPAT DIHAPUS, GAGAL MENEMUKAN ID BUKU',
  });

  response.code(404);
  return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler, }; // 1,2,3,4,5