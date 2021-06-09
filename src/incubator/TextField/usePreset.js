import defaultPreset from "./presets/default";
export default function usePreset({
  preset
  /*  = 'default' */
  ,
  ...props
}) {
  if (preset === 'default') {
    return { ...defaultPreset,
      ...props
    };
  }

  return props;
}