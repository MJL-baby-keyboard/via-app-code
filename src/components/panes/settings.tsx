import React from 'react';
import {Pane} from './pane';
import styled from 'styled-components';
import {ControlRow, Label, Detail, OverflowCell} from './grid';
import {AccentSlider} from '../inputs/accent-slider';
import {ErrorMessage} from '../styled';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'src/store/hooks';
import {
  getAllowKeyboardKeyRemapping,
  getShowDesignTab,
  getDisableFastRemap,
  getDisableHardwareAcceleration,
  getRestartRequired,
  toggleCreatorMode,
  toggleFastRemap,
  toggleHardwareAcceleration,
  requireRestart,
  toggleKeyRemappingViaKeyboard,
} from 'src/store/settingsSlice';

const RestartMessage = styled(ErrorMessage)`
  margin: 0;
  font-size: 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;

const DebugPane = styled(Pane)`
  display: grid;
  max-width: 100vw;
  grid-template-columns: 100vw;
`;

export const Settings = () => {
  const dispatch = useDispatch();

  // TODO: we could actually just grab all these from state.settings and then destructure.
  // Only advantage of this approach is indiviual memoisation. Worth?
  const allowKeyboardKeyRemapping = useAppSelector(
    getAllowKeyboardKeyRemapping,
  );
  const showDesignTab = useAppSelector(getShowDesignTab);
  const disableFastRemap = useAppSelector(getDisableFastRemap);

  return (
    <DebugPane>
      <OverflowCell>
        <Container>
          <ControlRow>
            <Label>Show Design tab</Label>
            <Detail>
              <AccentSlider
                onChange={() => dispatch(toggleCreatorMode())}
                isChecked={showDesignTab}
              />
            </Detail>
          </ControlRow>
          <ControlRow>
            <Label>Fast Key Mapping</Label>
            <Detail>
              <AccentSlider
                onChange={() => dispatch(toggleFastRemap())}
                isChecked={disableFastRemap}
              />
            </Detail>
          </ControlRow>
          <ControlRow>
            <Label>Allow remapping via keyboard</Label>
            <Detail>
              <AccentSlider
                onChange={() => dispatch(toggleKeyRemappingViaKeyboard())}
                isChecked={allowKeyboardKeyRemapping}
              />
            </Detail>
          </ControlRow>
        </Container>
      </OverflowCell>
    </DebugPane>
  );
};
