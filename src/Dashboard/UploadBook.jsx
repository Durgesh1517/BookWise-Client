import React, { useState } from 'react';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';

const UploadBook = () => {
  const bookCategories = [
    "Fiction", "Non-fiction", "Mystery", "Programming", "Science fiction",
    "Fantasy", "Horror", "Biography", "Autobiography", "History", "Self-help",
    "Business", "Memoir", "Poetry", "Children's books", "Travel", 
    "Religion and spirituality", "Science", "Art and design",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const [price, setPrice] = useState('');

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;

    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPDFURL,
      price,
    };

    fetch("http://localhost:5000/upload-book", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Book uploaded successfully!");
        form.reset();
        setPrice('');
      })
      .catch((error) => {
        console.error("Error uploading book:", error);
      });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book!</h2>
      <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={handleSubmit}>

        {/* First row */}
        <div className='flex gap-8'>
          {/* Book name */}
          <div className='lg:w-1/2'>
            <Label htmlFor="bookTitle" value="Book Title" />
            <TextInput
              id="bookTitle"
              placeholder="Book Name"
              required
              type="text"
              name='bookTitle'
              className='w-full'
            />
          </div>

          {/* Author name */}
          <div className='lg:w-1/2'>
            <Label htmlFor="authorName" value="Author Name" />
            <TextInput
              id="authorName"
              placeholder="Author Name"
              required
              type="text"
              name='authorName'
              className='w-full'
            />
          </div>
        </div>

        {/* Second row */}
        <div className='flex gap-8'>
          {/* Book image URL */}
          <div className='lg:w-1/2'>
            <Label htmlFor="imageURL" value="Book Image URL" />
            <TextInput
              id="imageURL"
              placeholder="Image URL"
              required
              type="text"
              name='imageURL'
              className='w-full'
            />
          </div>

          {/* Book category */}
          <div className='lg:w-1/2'>
            <Label htmlFor="inputState" value="Book Category" />
            <Select
              id="inputState"
              name="categoryName"
              className="w-full rounded"
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Book description */}
        <div>
          <Label htmlFor="bookDescription" value="Book Description" />
          <Textarea
            id="bookDescription"
            placeholder="Book Description"
            required
            type="text"
            name='bookDescription'
            className='w-full'
            rows={4}
          />
        </div>

        {/* Book PDF URL */}
        <div>
          <Label htmlFor="bookPDFURL" value="Book PDF Link" />
          <TextInput
            id="bookPDFURL"
            placeholder="Paste Book PDF URL here"
            required
            type="text"
            name='bookPDFURL'
            className='w-full'
          />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price" value="Price" />
          <TextInput
            id="price"
            placeholder="Book Price"
            required
            type="text"
            name='price'
            className='w-full'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <Button type="submit" className='mt-5'>
          Upload Book
        </Button>
      </form>
    </div>
  );
}

export default UploadBook;
