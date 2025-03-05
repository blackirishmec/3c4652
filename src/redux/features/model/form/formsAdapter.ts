import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Form } from '@/interfaces/models/formModels';

const formsAdapter = createEntityAdapter<Form, Form['id']>({
	selectId: form => form.id,
	sortComparer: false,
});

export default formsAdapter;
