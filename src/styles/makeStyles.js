import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withEmotionCache } from '@emotion/react';
import { serializeStyles } from '@emotion/serialize';
import { insertStyles } from '@emotion/utils';
import { useTheme } from '@mui/material/styles';

/**
 * Material UI v5 removed the JSS powered `makeStyles` hook from `@mui/material`
 * and moved it to `@mui/styles`, which is deprecated and still based on JSS.
 * Mixing JSS with the Emotion based components of Material UI v5+ breaks style
 * overrides, because JSS and Emotion use separate style sheets and separate
 * theme contexts.
 *
 * The hook below is a drop-in replacement built on top of Emotion, the very
 * same engine Material UI uses. Styles are registered in the shared Emotion
 * cache, which means that a generated class name can be composed with the
 * styles of a Material UI component: the component merges the registered
 * styles into its own rule, so an application style always wins over the
 * component default.
 */
const emotionCssContext = createContext(null);

function EmotionCssProvider({ children }, cache) {
  const css = useMemo(
    () =>
      (...args) => {
        const serialized = serializeStyles(args, cache.registered);
        insertStyles(cache, serialized);
        return `${cache.key}-${serialized.name}`;
      },
    [cache]
  );

  return <emotionCssContext.Provider value={css}>{children}</emotionCssContext.Provider>;
}

export const EmotionCssContextProvider = withEmotionCache(EmotionCssProvider);

EmotionCssProvider.propTypes = {
  children: PropTypes.node
};

/**
 * Emotion powered replacement for the removed `makeStyles` hook.
 *
 * @param {object|function} stylesOrCreator A style object, or a callback
 *   receiving the Material UI theme and returning a style object.
 * @returns {function} A hook returning an object of generated class names.
 */
export const makeStyles = stylesOrCreator => {
  const useStyles = () => {
    const css = useContext(emotionCssContext);
    const theme = useTheme();

    return useMemo(() => {
      const styles =
        typeof stylesOrCreator === 'function' ? stylesOrCreator(theme) : stylesOrCreator;
      const classes = {};

      Object.keys(styles).forEach(key => {
        classes[key] = css(styles[key]);
      });

      return classes;
    }, [css, theme]);
  };

  return useStyles;
};

export default makeStyles;
