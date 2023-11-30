const colorInput = document.getElementById('color')! as HTMLInputElement;
const likeInput = document.getElementById('like')! as HTMLInputElement;
const statusElement = document.getElementById('status')! as HTMLElement;

interface ExtensionSettings {
    favoriteColor: string;
    likesColor: boolean;
}

// Saves options to chrome.storage
const saveOptions = () => {
    const color = colorInput.value;
    const likesColor = likeInput.checked;

    chrome.storage.sync.set(
      { favoriteColor: color, likesColor: likesColor },
      () => {
        // Update status to let user know options were saved.
        statusElement.textContent = 'Options saved.';
        setTimeout(() => {
            statusElement.textContent = '';
        }, 750);
      }
    );
  };

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      (items: { [key: string]: any }) => {
        const settings = items as ExtensionSettings;
        colorInput.value = settings.favoriteColor;
        likeInput.checked = settings.likesColor;
      }
    );
  };

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save')!.addEventListener('click', saveOptions);
