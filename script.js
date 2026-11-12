
document.documentElement.classList.add("js");

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Отвори менюто");
    document.body.classList.remove("menu-open");
}

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const opened = navigation.classList.toggle("open");

        menuToggle.classList.toggle("active", opened);
        menuToggle.setAttribute("aria-expanded", String(opened));
        menuToggle.setAttribute(
            "aria-label",
            opened ? "Затвори менюто" : "Отвори менюто"
        );

        document.body.classList.toggle("menu-open", opened);
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (
            navigation.classList.contains("open") &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 960) closeMenu();
    });
}

function updateHeader() {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 30);
    }
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
    const position = window.scrollY + 160;
    let current = "home";

    sections.forEach(section => {
        if (position >= section.offsetTop) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -25px 0px"
        }
    );

    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}

const tickerTrack = document.querySelector(".ticker-track");
const tickerGroup = tickerTrack?.querySelector(".ticker-group");

if (tickerTrack && tickerGroup) {
    const originalItems = Array.from(
        tickerGroup.children,
        item => item.cloneNode(true)
    );

    function rebuildTicker() {
        tickerTrack.style.animation = "none";

        tickerGroup.replaceChildren(
            ...originalItems.map(item => item.cloneNode(true))
        );

        const requiredWidth = window.innerWidth + 250;
        let attempts = 0;

        while (
            tickerGroup.scrollWidth < requiredWidth &&
            attempts < 30
        ) {
            originalItems.forEach(item => {
                tickerGroup.appendChild(item.cloneNode(true));
            });

            attempts++;
        }

        const secondGroup = tickerGroup.cloneNode(true);
        secondGroup.setAttribute("aria-hidden", "true");

        tickerTrack.replaceChildren(tickerGroup, secondGroup);

        void tickerTrack.offsetWidth;
        tickerTrack.style.animation = "";
    }

    rebuildTicker();

    if (document.fonts) {
        document.fonts.ready.then(rebuildTicker);
    }

    let resizeFrame = null;

    window.addEventListener("resize", () => {
        if (resizeFrame !== null) {
            cancelAnimationFrame(resizeFrame);
        }

        resizeFrame = requestAnimationFrame(() => {
            rebuildTicker();
            resizeFrame = null;
        });
    });
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
        if (!item.open) return;

        faqItems.forEach(other => {
            if (other !== item) {
                other.open = false;
            }
        });
    });
});

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* VEYRA INTERACTIVE */

const MEDIA_BASE =
    "https://raw.githubusercontent.com/" +
    "amirmushichge/veyra-interactive-car/" +
    "v1.0.0/public/media/";

const carExterior = document.getElementById("carExterior");
const carVideo = document.getElementById("carVideo");
const carDetail = document.getElementById("carDetail");
const carDetailImage = document.getElementById("carDetailImage");
const carDetailTitle = document.getElementById("carDetailTitle");
const carDetailDescription = document.getElementById("carDetailDescription");
const carDetailEyebrow = document.getElementById("carDetailEyebrow");
const carDetailControls = document.getElementById("carDetailControls");
const carBack = document.getElementById("carBack");
const carReset = document.getElementById("carReset");
const carPanel = document.getElementById("carPanel");
const carPanelClose = document.getElementById("carPanelClose");
const carPanelTitle = document.getElementById("carPanelTitle");
const carOptions = document.getElementById("carOptions");
const carStatus = document.getElementById("carStatus");
const carActions = document.querySelectorAll("[data-car-action]");
const carHotspots = document.querySelectorAll(".car-hotspot");

if (carExterior && carVideo && carDetail && carPanel) {
    const exteriorImage = MEDIA_BASE + "exterior-polished.png";

    const imageChoices = {
        paint: [
            {
                name: "Studio Silver",
                color: "#d6dce0",
                image: "exterior-polished.png"
            },
            {
                name: "Electric Green",
                color: "#eaff35",
                image: "config/electric-green.png"
            },
            {
                name: "Lime Green",
                color: "#91ca5b",
                image: "config/lime-green.png"
            },
            {
                name: "Sky Blue",
                color: "#6bb9e6",
                image: "config/sky-blue.png"
            },
            {
                name: "Graphite",
                color: "#404852",
                image: "config/graphite.png"
            }
        ],

        wheels: [
            {
                name: "Multi-spoke",
                color: "#d6dce0",
                image: "exterior-polished.png"
            },
            {
                name: "Aero Disc",
                color: "#8c9da8",
                image: "config/wheels-aero.png"
            },
            {
                name: "Sport Forged",
                color: "#37434f",
                image: "config/wheels-forged.png"
            }
        ]
    };

    const details = {
        drive: {
            title: "Електрическо задвижване",
            eyebrow: "01 / ТЕХНИЧЕСКИ ИЗГЛЕД",
            description:
                "Разгледайте електрическия задвижващ модул " +
                "в тази независима автомобилна концепция.",
            image: "drive-blue.png",
            forward: "hood-hover-forward.mp4",
            reverse: "hood-hover-reverse.mp4"
        },

        battery: {
            title: "Батерийна система",
            eyebrow: "02 / ТЕХНИЧЕСКИ ИЗГЛЕД",
            description:
                "Интерактивен поглед към батерийната " +
                "архитектура на концептуалния автомобил.",
            image: "battery-blue.png",
            forward: "battery-hover-forward.mp4",
            reverse: "battery-hover-reverse.mp4"
        }
    };

    let currentPanel = null;
    let currentDetail = null;
    let selectedChoice = 0;

    let desiredHover = null;
    let settledHover = null;
    let animationBusy = false;
    let cancelCurrentClip = null;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function setCarStatus(message) {
        if (carStatus) {
            carStatus.textContent = message;
        }
    }

    function updateActiveActions(action) {
        carActions.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.carAction === action
            );
        });
    }

    function clearVideo() {
        if (cancelCurrentClip) {
            cancelCurrentClip();
        }

        carVideo.pause();
        carVideo.classList.remove("is-visible");
        carVideo.removeAttribute("src");
        carVideo.load();

        desiredHover = null;
        settledHover = null;
    }

    function playCarClip(filename, keepLastFrame) {
        return new Promise(resolve => {
            if (reduceMotion.matches) {
                resolve(false);
                return;
            }

            let finished = false;
            let timeoutId = null;

            function cleanup() {
                carVideo.removeEventListener("loadeddata", startPlayback);
                carVideo.removeEventListener("ended", handleEnded);
                carVideo.removeEventListener("error", handleError);

                if (timeoutId !== null) {
                    clearTimeout(timeoutId);
                }

                if (cancelCurrentClip === cancelPlayback) {
                    cancelCurrentClip = null;
                }
            }

            function complete(success) {
                if (finished) return;
                finished = true;

                cleanup();

                if (!success || !keepLastFrame) {
                    carVideo.classList.remove("is-visible");
                } else {
                    carVideo.pause();
                }

                resolve(success);
            }

            function startPlayback() {
                if (finished) return;

                carVideo.classList.add("is-visible");

                const result = carVideo.play();

                if (result && typeof result.catch === "function") {
                    result.catch(() => complete(false));
                }
            }

            function handleEnded() {
                complete(true);
            }

            function handleError() {
                complete(false);
            }

            function cancelPlayback() {
                complete(false);
            }

            cancelCurrentClip = cancelPlayback;

            carVideo.pause();
            carVideo.classList.remove("is-visible");

            carVideo.addEventListener(
                "loadeddata",
                startPlayback,
                { once: true }
            );

            carVideo.addEventListener(
                "ended",
                handleEnded,
                { once: true }
            );

            carVideo.addEventListener(
                "error",
                handleError,
                { once: true }
            );

            timeoutId = setTimeout(() => complete(false), 15000);

            carVideo.src = MEDIA_BASE + filename;
            carVideo.load();
        });
    }

    async function reconcileHover() {
        if (animationBusy || currentPanel || currentDetail) return;

        animationBusy = true;

        try {
            while (
                desiredHover !== settledHover &&
                !currentPanel &&
                !currentDetail
            ) {
                if (settledHover) {
                    const previous = settledHover;
                    settledHover = null;

                    await playCarClip(
                        details[previous].reverse,
                        false
                    );

                    if (currentPanel || currentDetail) break;
                }

                if (desiredHover) {
                    const next = desiredHover;

                    const success = await playCarClip(
                        details[next].forward,
                        true
                    );

                    if (currentPanel || currentDetail) break;

                    if (success) {
                        settledHover = next;
                    } else {
                        desiredHover = null;
                        break;
                    }
                }
            }
        } finally {
            animationBusy = false;

            if (
                !currentPanel &&
                !currentDetail &&
                desiredHover !== settledHover
            ) {
                queueMicrotask(reconcileHover);
            }
        }
    }

    function requestHover(kind) {
        if (!details[kind]) return;
        if (currentPanel || currentDetail) return;

        desiredHover = kind;
        reconcileHover();
    }

    function releaseHover(kind) {
        if (desiredHover !== kind) return;

        desiredHover = null;
        reconcileHover();
    }

    function hideDetails() {
        currentDetail = null;

        carDetail.classList.remove("is-visible");
        carDetail.hidden = true;
        carDetailControls.hidden = true;

        carHotspots.forEach(button => {
            button.hidden = false;
        });

        carExterior.src = exteriorImage;

        clearVideo();
        updateActiveActions(null);

        setCarStatus(
            "Изберете точка, за да разгледате автомобила."
        );
    }

    function closePanel() {
        currentPanel = null;
        selectedChoice = 0;

        carPanel.hidden = true;
        carOptions.replaceChildren();

        carExterior.src = exteriorImage;

        clearVideo();
        updateActiveActions(null);

        setCarStatus(
            "Изберете цвят, джанти или технически изглед."
        );
    }

    function resetCar() {
        if (currentDetail) {
            hideDetails();
        }

        if (currentPanel) {
            closePanel();
        }

        clearVideo();

        carExterior.src = exteriorImage;
        updateActiveActions(null);

        carHotspots.forEach(button => {
            button.hidden = false;
        });

        setCarStatus("Автомобилът е върнат в началния изглед.");
    }

    function showDetail(kind) {
        const detail = details[kind];

        if (!detail) return;

        if (currentPanel) {
            closePanel();
        }

        clearVideo();

        currentDetail = kind;

        carDetailTitle.textContent = detail.title;
        carDetailEyebrow.textContent = detail.eyebrow;
        carDetailDescription.textContent = detail.description;
        carDetailImage.src = MEDIA_BASE + detail.image;
        carDetailImage.alt = detail.title;

        carDetail.hidden = false;
        carDetailControls.hidden = false;

        carHotspots.forEach(button => {
            button.hidden = true;
        });

        requestAnimationFrame(() => {
            carDetail.classList.add("is-visible");
        });

        updateActiveActions(kind);
        setCarStatus("Технически изглед: " + detail.title);
    }

    function createChoiceButton(choice, index) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "veyra-option";
        button.classList.toggle("active", index === selectedChoice);
        button.setAttribute(
            "aria-pressed",
            String(index === selectedChoice)
        );

        const swatch = document.createElement("span");
        swatch.className = "veyra-swatch";
        swatch.style.backgroundColor = choice.color;

        const label = document.createElement("span");
        label.textContent = choice.name;

        button.append(swatch, label);

        button.addEventListener("click", () => {
            selectedChoice = index;

            carExterior.src = MEDIA_BASE + choice.image;

            carOptions.querySelectorAll(".veyra-option")
                .forEach((option, optionIndex) => {
                    const active = optionIndex === index;

                    option.classList.toggle("active", active);
                    option.setAttribute(
                        "aria-pressed",
                        String(active)
                    );
                });

            setCarStatus("Избрано: " + choice.name);
        });

        return button;
    }

    function showPanel(kind) {
        if (!imageChoices[kind]) return;

        if (currentDetail) {
            hideDetails();
        }

        clearVideo();

        currentPanel = kind;
        selectedChoice = 0;

        carExterior.src = exteriorImage;

        carPanelTitle.textContent =
            kind === "paint" ? "Цвят на купето" : "Дизайн на джантите";

        carOptions.replaceChildren();

        imageChoices[kind].forEach((choice, index) => {
            carOptions.appendChild(
                createChoiceButton(choice, index)
            );
        });

        carPanel.hidden = false;
        updateActiveActions(kind);

        setCarStatus(
            kind === "paint"
                ? "Изберете един от петте цвята."
                : "Изберете един от трите дизайна на джанти."
        );
    }

    function handleAction(action) {
        if (details[action]) {
            showDetail(action);
            return;
        }

        if (imageChoices[action]) {
            if (currentPanel === action) {
                closePanel();
            } else {
                showPanel(action);
            }
        }
    }

    carActions.forEach(button => {
        const kind = button.dataset.carAction;

        button.addEventListener("click", () => {
            handleAction(kind);
        });

        if (button.classList.contains("car-hotspot")) {
            if (details[kind]) {
                button.addEventListener("pointerenter", event => {
                    if (event.pointerType === "mouse") {
                        requestHover(kind);
                    }
                });

                button.addEventListener("pointerleave", event => {
                    if (event.pointerType === "mouse") {
                        releaseHover(kind);
                    }
                });

                button.addEventListener("focus", () => {
                    requestHover(kind);
                });

                button.addEventListener("blur", () => {
                    releaseHover(kind);
                });
            }
        }
    });

    carReset.addEventListener("click", resetCar);

    carPanelClose.addEventListener("click", closePanel);

    carBack.addEventListener("click", hideDetails);

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        if (currentDetail) {
            hideDetails();
        } else if (currentPanel) {
            closePanel();
        }
    });

    carExterior.addEventListener("error", () => {
        setCarStatus(
            "Изображението не можа да се зареди. " +
            "Проверете интернет връзката."
        );
    });

    carVideo.addEventListener("error", () => {
        carVideo.classList.remove("is-visible");
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            carVideo.pause();
        } else if (settledHover || desiredHover) {
            resetCar();
        }
    });

    reduceMotion.addEventListener?.("change", () => {
        if (reduceMotion.matches) {
            clearVideo();
        }
    });
}
