import { ILevel } from "../levels/ILevel";

export function parseLevelFromJsonUpload(event: any): Promise<ILevel> {
    return new Promise(resolve => {
        const files: any[] = event.target.files;
        const reader = new FileReader();
        reader.onload = file => {
            try {
                const json = JSON.parse(file.target.result as string);
                resolve(json);
            } catch (err) {
                alert(
                    `Error when trying to parse file as JSON. Original error: ${err.message}`
                );
            }
        };
        reader.readAsText(files[0]);
    });
}
