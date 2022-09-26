test('toEqual can`t compare class name', () => {
  class Foo {
    constructor() {
      this.message = 'hello';
    }
  }

  class Bar extends Foo {
    constructor() {
      super();
    }
  }

  const foo = new Foo();
  const bar = new Bar();

  // 同じプロパティを持つインスタンスなのでtrue
  expect(foo).toEqual(bar);

  // ただし、クラス名は異なる
  expect(foo.constructor.name).not.toEqual(bar.constructor.name);
});

test('throw Error when passing no variable', () => {
  class Foo {
    constructor({ message }) {
      this.message = message;
    }
  }

  // インスタンスを作成する際に引数がないため、undefinedとなるオブジェクトの
  // プロパティへの参照が発生して、TypeErrorで失敗する

  // babelrcにnodeの設定がなければ、下記のエラーメッセージになる
  // const nodeErrorMessage = "Cannot read properties of undefined (reading 'message')";
  const nodeErrorMessage =
    "Cannot destructure property 'message' of 'undefined' as it is undefined.";

  expect(() => new Foo()).toThrow();
  expect(() => new Foo()).toThrow(TypeError);
  expect(() => new Foo()).toThrow(nodeErrorMessage);
});
