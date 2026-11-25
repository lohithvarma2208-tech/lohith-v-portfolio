import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const norm = (child.name || "").replace(/\./g, "").toLowerCase();
                if (mesh.material && !Array.isArray(mesh.material)) {
                  const mat = mesh.material.clone() as THREE.MeshStandardMaterial;
                  if (norm.includes("shirt") || norm === "bodyshirt") {
                    mat.color.set("#1d4ed8");
                    mat.roughness = 0.48;
                    mat.metalness = 0.08;
                  } else if (norm === "pant") {
                    mat.color.set("#1e3a8a");
                    mat.roughness = 0.52;
                    mat.metalness = 0.05;
                  } else if (
                    norm.includes("face") ||
                    norm === "plane007" ||
                    norm === "neck" ||
                    norm === "hand" ||
                    norm.includes("ear")
                  ) {
                    mat.color.set("#d99b78");
                    mat.roughness = 0.55;
                    mat.metalness = 0.0;
                  } else if (norm === "hair" || norm.includes("eyebrow")) {
                    mat.color.set("#18141c");
                    mat.roughness = 0.45;
                    mat.metalness = 0.05;
                  } else if (norm === "shoe") {
                    mat.color.set("#111827");
                    mat.roughness = 0.32;
                    mat.metalness = 0.18;
                  } else if (norm === "sole") {
                    mat.color.set("#e2e8f0");
                    mat.roughness = 0.5;
                    mat.metalness = 0.0;
                  } else if (norm === "cube002" || norm === "plane003") {
                    mat.color.set("#1e1b2e");
                    mat.roughness = 0.42;
                    mat.metalness = 0.25;
                  } else if (norm === "plane002") {
                    mat.color.set("#161422");
                    mat.roughness = 0.5;
                    mat.metalness = 0.15;
                  }
                  mesh.material = mat;
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
