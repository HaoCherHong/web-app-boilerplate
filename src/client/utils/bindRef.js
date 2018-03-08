export default function bindRef(name, target) {
  return element => target[name] = element;
}
