// mock out C3 because it isn't compatible with jsdom which jest uses for tests
class C3 {
  generate = () => undefined;
}
const c3 = new C3();
export default c3;
