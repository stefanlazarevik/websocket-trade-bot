import {AssetMap} from "../wallet";

export interface AssetAware {
    onUpdateAssets(assets: AssetMap, reservedAssets: AssetMap): void;
}

export const isAssetAware = (plugin: any): plugin is AssetAware => plugin.onUpdateAssets !== undefined;
