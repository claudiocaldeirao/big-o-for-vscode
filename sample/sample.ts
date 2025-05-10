const method = () => {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
};

function method2() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      console.log(i, j);
    }
  }
}

class myClass {
  constructor() {
    console.log("myClass");
  }

  method(): number {
    let i = 0;

    while (i < 100) {
      console.log(i);
      i++;
    }

    return i;
  }
}

const simpleFunction = (text: string) => {
  console.log(text);
};

function fibonnaci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonnaci(n - 1) + fibonnaci(n - 2);
}
