
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class SavedProvidersCreateCommand : IRequest<SavedProviders>
    {
        public SavedProviders SavedProviders { get; set; }
    }
}
