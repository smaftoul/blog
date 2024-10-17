{
  description = "an eleventy project flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        eleventy = pkgs.writeShellApplication {
          name = "eleventy";
          runtimeInputs = [ pkgs.nodejs_20 ];
          text = ''
            # serve the directory in port 8080
            npm install @11ty/eleventy
            npx -y @11ty/eleventy --serve --port=3030
          '';
        };
      in
      {
        devShells.default = with pkgs; mkShell {
          buildInputs = [
            nodejs_20
          ];
        };

        apps.default = {
          type = "app";
          program = "${eleventy}/bin/eleventy";
        };
      }
    );
}
