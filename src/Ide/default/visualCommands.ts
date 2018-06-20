import { AbstractionVisualCommand } from '../../plugins/Abstraction/visualCommand';
import { ApplicationVisualCommand } from '../../plugins/Application/visualCommand';
import { ReferenceVisualCommand } from '../../plugins/Reference/visualCommand';
import { VisualCommand } from '../VisualCommands/VisualCommand';

export const dafaultVisualCommands: VisualCommand[] = [AbstractionVisualCommand, ApplicationVisualCommand, ReferenceVisualCommand];
