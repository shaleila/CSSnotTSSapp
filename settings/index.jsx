function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Set Time Inserted</Text>}>
        <TextInput
          title="Time Tampon Inserted in 24 hour format"
          placeholder="HH:MM"
          settingsKey="time"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
