

import { useContact } from '@lib/hooks/use-contact';
import { useTranslations } from 'next-intl';
import { CreateContactUsInput } from 'types/global';
import * as yup from 'yup';
import { Form } from '../ui/form-components/form';
import Input from '../ui/form-components/input';
import TextArea from '../ui/form-components/text-area';
import Button from '../ui/form-components/button';

const contactFormSchema = yup.object().shape({
  name: yup.string().required('error-name-required'),
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
  subject: yup.string().required('error-subject-required'),
  description: yup.string().required('error-description-required'),
});
const ContactForm = () => {
  const  t  = useTranslations('common');
  const { mutate, isLoading } = useContact();

  function onSubmit(values: CreateContactUsInput) {
    mutate(values);
  }

  return (
    <Form<CreateContactUsInput>
      onSubmit={onSubmit}
      validationSchema={contactFormSchema as any}
    >
      {({ register, formState: { errors } }) => (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label={t('text-name')}
              {...register('name')}
              variant="outline"
              error={t(errors.name?.message!)}
            />
            <Input
              label={t('text-email')}
              {...register('email')}
              type="email"
              variant="outline"
              error={t(errors.email?.message!)}
            />
          </div>
          <Input
            label={t('text-subject')}
            {...register('subject')}
            variant="outline"
            className="my-6"
            error={t(errors.subject?.message!)}
          />
          <TextArea
            label={t('text-description')}
            {...register('description')}
            variant="outline"
            className="my-6"
            error={t(errors.description?.message!)}
          />

          <Button loading={isLoading} disabled={isLoading}>
            {t('text-submit')}
          </Button>
        </>
      )}
    </Form>
  );
};

export default ContactForm;
