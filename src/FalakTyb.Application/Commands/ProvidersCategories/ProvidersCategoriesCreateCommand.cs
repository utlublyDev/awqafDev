
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ProvidersCategoriesCreateCommand : IRequest<ProvidersCategories>
    {
        public ProvidersCategories ProvidersCategories { get; set; }
    }
}
