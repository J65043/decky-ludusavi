import { getServerApi } from "./state";
declare const appStore : any;
export const resolveGameName = async (appId: number) => {
    
    
    const [launchOptions, appOverview] = await Promise.all([
        SteamClient.Apps.GetLaunchOptionsForApp(appId),
        appStore.GetAppOverviewByAppID(appId)
    ]);
    
    const steamGameName = launchOptions?.strGameName;
    const nonSteamGameName = appOverview?.display_name;
    
    getServerApi().callPluginMethod<{ msg: string,logLevel:string }>("console_log", { msg: "SteamGame Name: " + steamGameName + nonSteamGameName,logLevel:"debug"})
    return steamGameName ?? nonSteamGameName;
}