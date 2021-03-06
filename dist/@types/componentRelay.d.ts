import { ComponentAction, ComponentPermission, ContentType, SNItem, AppDataField } from './snjsTypes';
declare type ComponentRelayOptions = {
    coallesedSaving?: boolean;
    coallesedSavingDelay?: number;
    /**
     * Outputs debugging information to console.
     */
    debug?: boolean;
    /**
     * Indicates whether or not the component accepts themes.
     */
    acceptsThemes?: boolean;
};
declare type ComponentRelayParams = {
    /**
     * Represents the window object that the component is running in.
     */
    targetWindow: Window;
    /**
     * A collection of permissions that the component can request
     * access once it's ready.
     */
    initialPermissions?: ComponentPermission[];
    /**
     * The options to initialize
     */
    options?: ComponentRelayOptions;
    /**
     * A callback that is executed after the component has been registered.
     */
    onReady?: () => void;
};
declare type ItemPayload = {
    content_type?: ContentType;
    content?: any;
    [key: string]: any;
};
export * from './snjsTypes';
export default class ComponentRelay {
    private contentWindow;
    private initialPermissions?;
    private onReadyCallback?;
    private component;
    private sentMessages;
    private messageQueue;
    private lastStreamedItem?;
    private pendingSaveItems?;
    private pendingSaveTimeout?;
    private pendingSaveParams?;
    private coallesedSaving;
    private coallesedSavingDelay;
    private messageHandler?;
    constructor(params: ComponentRelayParams);
    private processParameters;
    deinit(): void;
    private registerMessageHandler;
    private handleMessage;
    private onReady;
    /**
     * Gets the component UUID.
     */
    getSelfComponentUUID(): string | undefined;
    /**
     * Checks if the component is running in a Desktop application.
     */
    isRunningInDesktopApplication(): boolean;
    /**
     * Checks if the component is running in a Mobile application.
     */
    isRunningInMobileApplication(): boolean;
    /**
     * Gets the component's data value for the specified key.
     * @param key The key for the data object.
     * @returns `undefined` if the value for the key does not exist. Returns the stored value otherwise.
     */
    getComponentDataValueForKey(key: string): any;
    /**
     * Sets the component's data value for the specified key.
     * @param key The key for the data object.
     * @param value The value to store under the specified key.
     */
    setComponentDataValueForKey(key: string, value: any): void;
    /**
     * Clears the component's data object.
     */
    clearComponentData(): void;
    private postMessage;
    private requestPermissions;
    private activateThemes;
    private themeElementForUrl;
    private deactivateTheme;
    private generateUUID;
    /**
     * Gets the current platform where the component is running.
     */
    get platform(): string | undefined;
    /**
     * Gets the current environment where the component is running.
     */
    get environment(): string | undefined;
    /**
     * Streams a collection of Items, filtered by content type.
     * New items are passed to the callback as they come.
     * @param contentTypes A collection of Content Types.
     * @param callback A callback to process the streamed items.
     */
    streamItems(contentTypes: ContentType[], callback: (data: any) => void): void;
    /**
     * Streams the current Item in context.
     * @param callback A callback to process the streamed item.
     */
    streamContextItem(callback: (data: any) => void): void;
    /**
     * Selects a `Tag` item.
     * @param item The Item (`Tag` or `SmartTag`) to select.
     */
    selectItem(item: ItemPayload): void;
    /**
     * Clears current selected `Tag` (if any).
     */
    clearSelection(): void;
    /**
     * Creates and stores an Item in the item store.
     * @param item The Item's payload content.
     * @param callback The callback to process the created Item.
     */
    createItem(item: ItemPayload, callback: (data: any) => void): void;
    /**
     * Creates and stores a collection of Items in the item store.
     * @param items The Item(s) payload collection.
     * @param callback The callback to process the created Item(s).
     */
    createItems(items: ItemPayload[], callback: (data: any) => void): void;
    /**
     * Associates a `Tag` with the current Note.
     * @param item The `Tag` item to associate.
     */
    associateItem(item: ItemPayload): void;
    /**
     * Deassociates a `Tag` with the current Note.
     * @param item The `Tag` item to deassociate.
     */
    deassociateItem(item: ItemPayload): void;
    /**
     * Deletes an Item from the item store.
     * @param item The Item to delete.
     * @param callback The callback with the result of the operation.
     */
    deleteItem(item: SNItem, callback: (data: any) => void): void;
    /**
     * Deletes a collection of Items from the item store.
     * @param items The Item(s) to delete.
     * @param callback The callback with the result of the operation.
     */
    deleteItems(items: SNItem[], callback: (data: any) => void): void;
    /**
     * Performs a custom action to the component manager.
     * @param action
     * @param data
     * @param callback The callback with the result of the operation.
     */
    sendCustomEvent(action: ComponentAction, data: any, callback?: (data: any) => void): void;
    /**
     * Saves an existing Item in the item store.
     * @param item An existing Item to be saved.
     * @param callback
     * @param skipDebouncer
     */
    saveItem(item: SNItem, callback?: () => void, skipDebouncer?: boolean): void;
    /**
     * Runs a callback before saving an Item.
     * @param item An existing Item to be saved.
     * @param presave Allows clients to perform any actions last second before the save actually occurs (like setting previews).
     * Saves debounce by default, so if a client needs to compute a property on an item before saving, it's best to
     * hook into the debounce cycle so that clients don't have to implement their own debouncing.
     * @param callback
     */
    saveItemWithPresave(item: SNItem, presave: any, callback: () => void): void;
    /**
     * Runs a callback before saving a collection of Items.
     * @param items A collection of existing Items to be saved.
     * @param presave Allows clients to perform any actions last second before the save actually occurs (like setting previews).
     * Saves debounce by default, so if a client needs to compute a property on an item before saving, it's best to
     * hook into the debounce cycle so that clients don't have to implement their own debouncing.
     * @param callback
     */
    saveItemsWithPresave(items: SNItem[], presave: any, callback: () => void): void;
    private _performSavingOfItems;
    /**
     * Saves a collection of existing Items.
     * @param items The items to be saved.
     * @param callback
     * @param skipDebouncer Allows saves to go through right away rather than waiting for timeout.
     * This should be used when saving items via other means besides keystrokes.
     * @param presave
     */
    saveItems(items: SNItem[], callback?: () => void, skipDebouncer?: boolean, presave?: any): void;
    /**
     * Sets a new container size for the current component.
     * @param width The new width.
     * @param height The new height.
     */
    setSize(width: string | number, height: string | number): void;
    private jsonObjectForItem;
    /**
     * Gets the Item's appData value for the specified key.
     * Uses the default domain (org.standardnotes.sn).
     * @param item The Item to get the appData value from.
     * @param key The key to get the value from.
     */
    getItemAppDataValue(item: SNItem, key: AppDataField): any;
}
