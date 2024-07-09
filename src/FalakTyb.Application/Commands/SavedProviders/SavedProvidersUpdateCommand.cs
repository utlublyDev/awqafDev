
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class SavedProvidersUpdateCommand : IRequest<SavedProviders>
    {
        public SavedProviders SavedProviders { get; set; }
    }
}
