class NoAuthSigner {
  async sign(httpRequest, identity, signingProperties) {
    return httpRequest;
  }
}
const version = "3.996.11";
const packageInfo = {
  version
};
export {
  NoAuthSigner as N,
  packageInfo as p
};
