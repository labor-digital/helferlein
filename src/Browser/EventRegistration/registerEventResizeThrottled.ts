/**
 * Created by Martin Neundorfer on 24.01.2019.
 * For LABOR.digital
 */
import {throttleEvent} from "../../Ui/throttleEvent";
import {EventBus} from "../EventBus";
let isRegistered = false;
/**
 * Registeres a "resize__throttled" event which is called every time
 * the window is resized, but which has a debounce rate of 150ms
 */
export function registerEventResizeThrottled():void {
	if(isRegistered) return;
	isRegistered = true;
	window.addEventListener("resize", throttleEvent(() => {
		EventBus.emit("resize__throttled");
	}, 150));
}