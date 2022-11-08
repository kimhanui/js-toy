function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Example {
  a() {}
  @readonly
  b() {}
}

export function eecute(){
    const e = new Example();
    e.a = 1;
    e.b = 2; // TypeError: Cannot assign to read only property 'b' of object '#<Example>'
}