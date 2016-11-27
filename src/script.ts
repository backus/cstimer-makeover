class TimerStorage {
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  fetch(key: string): TimerSettings {
    return JSON.parse(this.fetchValue(key));
  }

  write(key: string, changes: TimerSettings): void {
    this.storage.setItem(key, JSON.stringify(changes));
  }

  private fetchValue(key: string): string {
    const value = this.storage.getItem(key);

    if (value === null) {
      throw "Unknown value at key " + key;
    }

    return value;
  }
}

class TimerExtension {
  storage: TimerStorage;
  readonly settings: TimerSettings;

  constructor(storage: Storage, settings: TimerSettings) {
    this.storage  = new TimerStorage(storage);
    this.settings = settings;
  }

  setup() {
    this.enforceSSL();

    this.injectLink("stylesheet", "text/css", "styles.css");
    this.injectLink("icon", "image/x-icon", "img/favicon.png");

    this.applySettings();

    this.fixSidebar();
  }

  private applySettings() {
    const existingProperties = this.storage.fetch("properties");
    Object.assign(existingProperties, this.settings);
    this.storage.write("properties", existingProperties);
  }

  private injectLink(rel: string, type: string, url: string) {
    let elem  = document.createElement("link");
    elem.rel  = rel;
    elem.type = type;
    elem.href = chrome.extension.getURL(url);

    document.documentElement.appendChild(elem);
  }

  private enforceSSL() {
    if (window.location.protocol !== "https:") {
      window.location.protocol = "https:";
    }
  }

  private fixSidebar() {
    setTimeout(this.tryFixSidebar.bind(this), 100);
  }

  // Check if our sidebar has been restyled and resize it if possible
  // Continues fixSidebar loop if the sidebar has not yet been restyled
  private tryFixSidebar() {
    if (this.sidebarStylesApplied()) {
      this.simulateResize();
    } else {
      this.fixSidebar();
    }
  }

  // Probe to check whether the sidebar has been restyled
  // We alter the sidebar to not have a border so we check
  // the computed styles to determine whether it has been updated
  private sidebarStylesApplied(): boolean {
    const scroll = document.querySelector(".myscroll");

    if (scroll === null) throw "Expected to find scroll div";

    const computedBorder: string = getComputedStyle(scroll).borderTop || "";

    return computedBorder.substr(0, 3) === "1px";
  }

  // We restyle the sidebar and this results in it only filling half the
  // page. CSTimer automatically resizes the sidebar on window resize events
  // so we manually trigger changes after our other changes are injected
  private simulateResize() {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("resize", true, false);
    document.dispatchEvent(event);
  }
}

type TimerSettings = {
  timerSize: number,  // Size of timer
  statsum:   boolean, // Show stat summary above sidebar
  stats:     boolean, // Display stats sidebar
  imgSize:   number,  // Size of scramble image
};

const fixedSettings = {
  timerSize: 20,
  statsum:   true,
  stats:     true,
  imgSize:   10,
};

(new TimerExtension(localStorage, fixedSettings)).setup();
