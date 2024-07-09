
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ProvidersCategoriesUpdateCommand : IRequest<ProvidersCategories>
    {
        public ProvidersCategories ProvidersCategories { get; set; }
    }
}
