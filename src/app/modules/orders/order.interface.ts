type OrderedBook = {
  bookId: string;
  quantity: number;
};

export type ICreateOrderedBook = {
  orderedBooks: OrderedBook[];
};
